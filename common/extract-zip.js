import JSZip from "jszip";
import mime from "mime-types";

let zip = new JSZip();

const getFileMeta = (dir) => {
  const start = dir.lastIndexOf("/");
  const name = dir.slice(start + 1);
  const ext = dir.split(".").pop();

  return { name, ext };
};

const extractZip = async (file) => {
  const contents = await zip.loadAsync(file);

  const results = Promise.all(
    Object.keys(contents.files).map(async (filename) => {
      const isDir = contents.files[filename].dir;

      if (!isDir) {
        let content = await zip.file(filename).async("blob");
        const { name, ext } = getFileMeta(filename);
        let file = new File([content], name, { type: mime.lookup(ext) });

        // (NOTE: daniel) Perhaps, we can use a file structure like this to handle directory upload
        // let item = { name, path: filename, data: file, dir: true };

        return file;
      }
    })
  );

  return results;
};

export default extractZip;
