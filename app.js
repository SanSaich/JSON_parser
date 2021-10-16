const buttonReset = document.querySelector(".column__input-reset");

buttonReset.addEventListener("click", () => resetPage(""));

function resetPage(code) {
  document.querySelector(".page__container").innerHTML = `${code}`;
}

async function uploadFile(input) {
  let fileJson = await input.files[0].text();
  let objJson = JSON.parse(fileJson);
  resetPage(fileJson);
  console.log(objJson);
}
