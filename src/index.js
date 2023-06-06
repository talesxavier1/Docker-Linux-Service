
const fs = require("fs");
const ShellComand = require("./ShellComand.js");


var imagesDigests;
var containers;

const main = async () => {

  while (true) {
    const dockerConf = (() => {
      let result = fs.readFileSync("./dockerConf.json");
      return JSON.parse(result);
    })();

    imagesDigests = await getDigests();
    containers = await getContainers();
    for (let CONF of dockerConf.globalConf) {
      let imagesAndContainer = (() => {
        let repositoryImages = imagesDigests.filter(VALUE => VALUE.Repository == CONF.repository);

        let finalResult = repositoryImages.map((IMAGE) => {
          return {
            "image": IMAGE,
            "containers": containers.filter((VALUE) => VALUE.Image == IMAGE.ID || VALUE.Image == IMAGE.Repository)
          };
        })

        return finalResult;
      })();

      let pullDigest = await (async () => {
        let resultAction = await ShellComand.executeShellComand(`docker pull ${CONF.repository}`);
        if (resultAction.status == "NOK") { return undefined }

        for (LINE of resultAction.message.split("\n")) {
          if (LINE.indexOf("Digest") > -1) {
            return LINE.replace(/(.*?)(?=sha256:)/, "");
          }
        }
        return undefined;
      })();

      if (!pullDigest) { continue }

      let imageUpdated = !imagesAndContainer.find(VALUE => VALUE.image.Digest == pullDigest);

      if (!imageUpdated) { continue }

      for (let IMAGE of imagesAndContainer) {
        for (let CONTAINER of IMAGE.containers) {
          await ShellComand.executeShellComand(`docker container kill ${CONTAINER.ID}`);
          await ShellComand.executeShellComand(`docker container rm ${CONTAINER.ID}`);
        }
        await ShellComand.executeShellComand(`docker image rm ${IMAGE.image.ID}`);
      }

      let newImage = await (async () => {
        let result = await getDigests();
        return result.find(VALUE => VALUE.Repository == CONF.repository)
      })();

      await ShellComand.executeShellComand(`docker run --name ${pullDigest.replace(":", "_")} -d -p ${CONF.startPort}:${80} ${newImage.ID} `);
    }
    await sleep(60000);
  }
}

const getDigests = async () => {
  let resultComand = await ShellComand.executeShellComand('docker images --digests --format "{{json .}}"');

  if (resultComand.status == "NOK") { return null }

  let resultObject = (() => {
    let splitResult = resultComand.message.split("\n").filter(VALUE => VALUE);
    return splitResult.map(VALUE => JSON.parse(VALUE));
  })();

  return resultObject;
};

const getContainers = async () => {
  let resultComand = await ShellComand.executeShellComand('docker ps -a --format "{{json .}}"');

  let resultObject = (() => {
    let splitResult = resultComand.message.split("\n").filter(VALUE => VALUE);
    return splitResult.map(VALUE => JSON.parse(VALUE));
  })();
  return resultObject;
}

const sleep = async (time) => {
  return new Promise(resolve => setTimeout(resolve, time));

}

main();


