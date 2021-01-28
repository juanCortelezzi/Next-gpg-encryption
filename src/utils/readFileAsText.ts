export default function readFileAsText(file: File): Promise<string> {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result as string);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsText(file);
  });
}
