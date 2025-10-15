const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    console.log("Job :", job.data);
    const fileInfo = job.data;
    console.log(fileInfo.path);

    //Load the PDF
        const loader = new PDFLoader(fileInfo.path);
        const docs = await loader.load();
        console.log("Docs :", docs[0]['pageContent']);
  })