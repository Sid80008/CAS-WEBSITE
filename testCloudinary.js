const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "Root",
  api_key: "945695365186243",
  api_secret: "DbnAr8z0xtfDV5K-_EtuSSpHC4A",
});

async function run() {
  try {
    const res = await cloudinary.uploader.upload("https://picsum.photos/200", { folder: "test" });
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
run();
