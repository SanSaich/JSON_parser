const buttonReset = document.querySelector(".column__input-reset");

buttonReset.addEventListener("click", () => resetPage(""));

function resetPage(code) {
  document.querySelector(".main-block__body").innerHTML = `${code}`;
}

async function uploadFile(input) {
  let fileJson = await input.files[0].text();
  let objJson = JSON.parse(fileJson);
  resetPage(fileJson);

  forObj(objJson);
}

const forObj = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      console.log("Массив:", key);
      forObj(value);
    } else {
      console.log("Ключ:", key, "Значение:", value);
    }
  });
};
