function previewMultiple(event) {
    const images = document.getElementById("images");
    const number = images.files.length;
    for (i = 0; i < number; i++) {
        const file = event.target.files[i];
        const urls = URL.createObjectURL(file);
        const filename = file.name;

        if (filename.length > 20) {
            const filenameShort = filename.substring(0, 12);

            document.getElementById("formFile").innerHTML +=
                '<div style="margin:10px;"><img src="' + urls + '"><p>' + filenameShort + "...</p></div>";
        } else {
            document.getElementById("formFile").innerHTML +=
                '<div style="margin:10px;"><img src="' + urls + '"><p>' + filename + "</p></div>";
        }
    }
    document.getElementById("formFile").classList.add("text-center");
}
