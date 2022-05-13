function generatePreview(){
    console.log("vnajkebkeanbkn")
    const appState = JSON.parse(localStorage.getItem("appItem"))
    imagePathList = []

    appState.edges.forEach(edge => {

        const id = edge.id
        const node = appState.nodes.find(item => item.id === id)
        randomImgPath = node.files[Math.floor(Math.random()*node.files.length)]
        console.log(randomImgPath.imgUrl)
        imagePathList.push(randomImgPath.imgUrl)
        
    });

    console.log(imagePathList)

}