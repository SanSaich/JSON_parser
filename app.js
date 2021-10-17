const buttonReset = document.querySelector(".column__input-reset");

buttonReset.addEventListener("click", () =>
  resetPage("Здесь могла быть ваша реклама.")
);

function resetPage(code) {
  document.querySelector(".main-block__body").innerHTML = `${code}`;
}

async function uploadFile(input) {
  let fileJson = await input.files[0].text();
  resetPage("");
  let objJson = JSON.parse(fileJson);
  forObj(objJson);
}

const forObj = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    let directory = document.querySelector(".main-block__body");
    if (typeof value === "string") {
      createDivClassText(key, value, directory);
    }
    if (key === "fields") {
      createDivClass(key, directory);
      directory = document.querySelector(`.${key}`);
      Object.entries(value).forEach(([key, value]) => {
        key = "column" + key;
        createDivClass(key, directory);
        createInputLabel(key, value);
      });
    }
  });
};

const createInputLabel = (key, value) => {
  directory = document.querySelector(`.${key}`);
  Object.entries(value).forEach(([key, value]) => {
    let idFor = Date.now();
    if (key === "label") {
      let elem = document.createElement(`${key}`);
      elem.setAttribute("for", `${idFor}`);
      elem.className = "fields__label";
      elem.innerHTML = `${value}`;
      directory.append(elem);
    }
    if (key === "input") {
      let elem = document.createElement(`${key}`);
      elem.setAttribute("id", `${idFor}`);
      Object.entries(value).forEach(([key, value]) => {
        elem.setAttribute(`${key}`, `${value}`);
      });
      elem.className = "fields__input";
      directory.append(elem);
    }
  });
};

const createDivClassText = (key, value, directory) => {
  let div = document.createElement("div");
  div.className = `${key}`;
  div.innerHTML = `<p>${value}</p>`;
  directory.append(div);
};

const createDivClass = (key, directory) => {
  let div = document.createElement("div");
  div.className = `${key}`;
  directory.append(div);
};

// const forObj = (obj) => {
//   Object.entries(obj).forEach(([key, value]) => {
//     let directory = document.querySelector(".main-block__body");
//     console.log(directory);
//     if (typeof value === "object" && Array.isArray(value)) {
//       createDivClass(key, directory);
//       directory = document.querySelector(`.${key}`);
//       forObj(value);
//     } else if (typeof value === "object" && !Array.isArray(value)) {
//       createDiv(directory);
//       directory = document.querySelector(`.${key}`);
//       forObj(value);
//     } else {
//       // console.log("Ключ:", key, "Значение:", value);
//       createDivClassText(key, value, directory);
//     }
//   });
// };
