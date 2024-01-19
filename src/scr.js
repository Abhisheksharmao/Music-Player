async function main() {
    let a = await fetch("http://localhost:3000/songs/")
    let response = await a.text();
    console.log(response);
}
main();