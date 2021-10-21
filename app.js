const buttonReset = document.querySelector(".column__input-reset");

buttonReset.addEventListener("click", () =>
  resetPage("Здесь могла быть ваша реклама.")
);

function resetPage(code) {
  document.querySelector(".main-block__body").innerHTML = `${code}`;
}

jsonfile.addEventListener("change", uploadFile);

async function uploadFile() {
  // let fileJson = await input.files[0].text();
  //при добавлении import в js сломался  onchange="uploadFile(this)" в <import>
  let fileJson = await this.files[0].text();
  resetPage("");
  let objJson = JSON.parse(fileJson);
  forObj(objJson);
}

const forObj = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    let directory = document.querySelector(".main-block__body");
    if (typeof value === "string") {
      createDivClassText(key, value, directory);
    } else if (key === "fields") {
      createDivClass(key, directory);
      directory = document.querySelector(`.${key}`);
      Object.entries(value).forEach(([key, value]) => {
        key = "columnFields" + key;
        createDivClass(key, directory);
        createField(key, value);
      });
    } else if (key === "references") {
      createDivClass(key, directory);
      directory = document.querySelector(`.${key}`);
      Object.entries(value).forEach(([key, value]) => {
        key = "columnRef" + key;
        createDivClass(key, directory);
        createReferences(key, value);
      });
    } else if (key === "buttons") {
      createDivClass(key, directory);
      directory = document.querySelector(`.${key}`);
      Object.entries(value).forEach(([key, value]) => {
        key = "columnBtn" + key;
        createDivClass(key, directory);
        createButtons(key, value);
      });
    }
  });
};

const createField = (key, value) => {
  directory = document.querySelector(`.${key}`);
  let idFor = key;
  Object.entries(value).forEach(([key, value]) => {
    if (key === "label") {
      let elem = document.createElement(`${key}`);
      elem.setAttribute("for", `${idFor}`);
      elem.className = "fields__label";
      elem.innerHTML = `${value}`;
      directory.append(elem);
    } else if (key === "input") {
      let elem = document.createElement(`${key}`);
      elem.setAttribute("id", `${idFor}`);
      elem.className = "form-control form-control-lg";
      Object.entries(value).forEach(([key, value]) => {
        if (value === "technology") {
          elem = document.createElement("select");
          elem.setAttribute("id", `${idFor}`);
          elem.setAttribute("aria-label", ".form-select-lg example");
          elem.className = "form-select form-select-lg";
          // $(function () {
          //   $("select").selectpicker();
          // });
        } else if (key === "technologies") {
          Object.values(value).forEach((value) => {
            let elemOption = document.createElement("option");
            elemOption.innerHTML = `${value}`;
            elem.append(elemOption);
          });
        } else if (value === "textarea") {
          console.log(value);
          elem = document.createElement("textarea");
          console.log(elem);
          elem.className = "form-control";
          elem.setAttribute("id", `${idFor}`);
          elem.setAttribute(`${key}`, `${value}`);
        }
        if (key === "filetype") {
          value = value.map((valueArr) => {
            return ` .${valueArr}`;
          });
          elem.setAttribute("accept", value);
        } else {
          elem.setAttribute(`${key}`, `${value}`);
          if (key === "mask") {
            $(function () {
              elem.setAttribute("type", "text");
              $(`#${idFor}`).mask(`${value}`);
            });
          }
        }
      });
      // elem.removeAttribute("multiple");
      directory.append(elem);
    }
  });
};

const createReferences = (key, value) => {
  directory = document.querySelector(`.${key}`);
  Object.entries(value).forEach(([key, value]) => {
    if (key === "input") {
      let elem = document.createElement(`${key}`);
      elem.className = "references__input";
      Object.entries(value).forEach(([key, value]) => {
        elem.setAttribute(`${key}`, `${value}`);
      });
      directory.append(elem);
    } else if (key === "text without ref") {
      console.log(key, value);
      let elem = (document.innerHTML = `${value} `);
      directory.append(elem);
    } else if (key === "text") {
      console.log(key, value);
      let elem = (document.innerHTML = `${value} `);
      directory.append(elem);
    } else if (key === "ref") {
      console.log(key, value);
      let elem = (document.insertAdjacentHTML = `${value} `);
      directory.append(elem);
    }
  });
};

const createButtons = (key, value) => {
  directory = document.querySelector(`.${key}`);
  Object.entries(value).forEach(([key, value]) => {
    console.log(key);
    let elem = document.createElement("input");
    elem.setAttribute(`type`, `button`);
    elem.setAttribute(`value`, `${value}`);
    elem.className = "column__input-reset";
    directory.append(elem);
  });
};

const createDivClassText = (key, value, directory) => {
  let div = document.createElement("div");
  div.className = `${key}`;
  div.innerHTML = `<h2>${value}</h2>`;
  directory.append(div);
};

const createDivClass = (key, directory) => {
  let div = document.createElement("div");
  div.className = `${key}`;
  directory.append(div);
};
