var IceAge2019;
(function (IceAge2019) {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("cart-link").addEventListener("click", toggleCart);
        document.getElementById("buy-button").addEventListener("click", acceptOrder);
        document.getElementById("close-modal").addEventListener("click", closeConfirmation);
        getDataFromServer();
    });
    function toggleCart() {
        document.getElementById("cart-overlay").classList.toggle("active");
    }
    function getDataFromServer() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", IceAge2019.address + "?getData0", true);
        xhr.addEventListener("readystatechange", handleStateChangeGetData);
        xhr.send();
    }
    function handleStateChangeGetData(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let response = xhr.response;
            let responseJSON = JSON.parse(response);
            let dataJSON;
            for (let key in responseJSON) {
                let datastring = decodeURI(responseJSON[key].datastring);
                dataJSON = JSON.parse(datastring);
            }
            let configData = [];
            for (let i in dataJSON) {
                configData[parseInt(i)] = {
                    title: dataJSON[i]["title"],
                    type: dataJSON[i]["type"],
                    items: [{ name: null, stock: null, price: null }, { name: null, stock: null, price: null }]
                };
                for (let k = 0; k < dataJSON[i]["items"].length; k++) {
                    configData[parseInt(i)]["items"][k] = {
                        name: dataJSON[i]["items"][k]["name"],
                        stock: dataJSON[i]["items"][k]["stock"],
                        price: dataJSON[i]["items"][k]["price"]
                    };
                }
            }
            buildStructure(configData);
        }
    }
    function buildStructure(configData) {
        const categoriesWrapper = document.getElementById("categories-wrapper");
        for (let categoryIndex in configData) {
            const currentCategory = configData[categoryIndex];
            if (currentCategory.type == "Radio")
                newRadioCategory(currentCategory);
            else
                newCheckboxCategory(currentCategory);
        }
        function newCategory(_category) {
            const categoryWrapper = IceAge2019.newElement("div", "category mb-1 border-bottom pb-5", categoriesWrapper);
            const headline = IceAge2019.newElement("h3", "pb-1", categoryWrapper);
            headline.innerHTML = _category.title;
            const divContainer = IceAge2019.newElement("div", "mx-5", categoryWrapper);
            const selectLabel = IceAge2019.newElement("label", "form-check-label text-secondary mb-1", divContainer);
            selectLabel.innerHTML = "Bitte auswählen:";
            const inputGroup = IceAge2019.newElement("div", "input-group input-group-lg", divContainer);
            const selectBox = IceAge2019.newElement("select", "custom-select", inputGroup);
            selectBox.addEventListener("change", getFormData);
            for (let item in _category["items"]) {
                const option = IceAge2019.newElement("option", "", selectBox);
                option.innerHTML = _category["items"][item].name;
                option.setAttribute("price", _category["items"][item].price);
            }
        }
        function newRadioCategory(_category) {
            const categoryWrapper = IceAge2019.newElement("div", "category mb-1 border-bottom pb-5", categoriesWrapper);
            const headline = IceAge2019.newElement("h3", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;
            const divContainer = IceAge2019.newElement("div", "mx-5", categoryWrapper);
            for (let item in _category["items"]) {
                const itemName = _category["items"][item].name;
                const itemStock = _category["items"][item].stock;
                const itemPrice = _category["items"][item].price;
                const divItemRow = IceAge2019.newElement("div", "px-3 py-2 mb-1 border rounded item-row", divContainer);
                const divForm = IceAge2019.newElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                const radioInput = IceAge2019.newElement("input", "form-check-input cursor-pointer", divForm);
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("name", _category.title);
                radioInput.setAttribute("id", itemName);
                radioInput.addEventListener("change", getFormData);
                const placeholder = IceAge2019.newElement("div", "col-1", divForm);
                const nameLabel = IceAge2019.newElement("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                const stockLabel = IceAge2019.newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " auf Lager";
                const priceLabel = IceAge2019.newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                const euroLabel = IceAge2019.newElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }
        }
        function newCheckboxCategory(_category) {
            const categoryWrapper = IceAge2019.newElement("div", "category mb-1 border-bottom pb-5", categoriesWrapper);
            const headline = IceAge2019.newElement("h3", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;
            const divContainer = IceAge2019.newElement("div", "mx-5", categoryWrapper);
            for (let item in _category["items"]) {
                const itemName = _category["items"][item].name;
                const itemStock = _category["items"][item].stock;
                const itemPrice = _category["items"][item].price;
                const divItemRow = IceAge2019.newElement("div", "px-3 py-2 mb-1 border rounded item-row", divContainer);
                const divForm = IceAge2019.newElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                const checkInput = IceAge2019.newElement("input", "form-check-input cursor-pointer", divForm);
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", itemName);
                checkInput.setAttribute("id", itemName);
                checkInput.addEventListener("change", formChangeHandler);
                const placeholder = IceAge2019.newElement("div", "col-1", divForm);
                const nameLabel = IceAge2019.newElement("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                const stockLabel = IceAge2019.newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " auf Lager";
                const priceLabel = IceAge2019.newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                const euroLabel = IceAge2019.newElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }
        }
    }
    function getFormData() {
        let allArticles = [];
        let articleCounter = 0;
        const categoriesWrapper = document.getElementById("categories-wrapper");
        const allCategories = categoriesWrapper.children;
        for (let i = 0; i < allCategories.length; i++) {
            const currentCategory = allCategories[i];
            const allInputs = currentCategory.getElementsByTagName("input");
            for (let i = 0; i < allInputs.length; i++) {
                const currentInput = allInputs[i];
                const itemName = currentInput.nextElementSibling.nextElementSibling.innerHTML;
                const itemPrice = currentInput.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
                if (currentInput.checked) {
                    allArticles[articleCounter] = {
                        name: itemName,
                        price: itemPrice
                    };
                    articleCounter++;
                }
            }
        }
        return allArticles;
    }
    function formChangeHandler() {
        renderCart(getFormData());
    }
    function renderCart(_articles) {
        const cartItemWrapper = document.getElementById("cart-item-wrapper");
        cartItemWrapper.innerHTML = "";
        let total = 0;
        for (let key in _articles) {
            const itemRow = IceAge2019.newElement("div", "item-row row py-1 rounded mb-1", cartItemWrapper);
            const itemNumber = IceAge2019.newElement("div", "col-2", itemRow);
            itemNumber.innerHTML = parseInt(key) + 1;
            const itemName = IceAge2019.newElement("div", "col-6", itemRow);
            itemName.innerHTML = _articles[key].name;
            const itemPrice = IceAge2019.newElement("div", "col-3 text-right", itemRow);
            itemPrice.innerHTML = parseFloat(_articles[key].price).toFixed(2).toString();
            total += parseFloat(_articles[key].price);
            const euro = IceAge2019.newElement("div", "col-1", itemRow);
            euro.innerHTML = "€";
        }
        document.getElementById("cart-total").innerHTML = total.toFixed(2).toString();
        const buyButton = document.getElementById("buy-button");
        if (cartItemWrapper.innerHTML == "")
            buyButton.disabled = true;
        else
            buyButton.disabled = false;
    }
    function acceptOrder() {
        const buyButton = document.getElementById("buy-button");
        buyButton.disabled = true;
        buyButton.classList.toggle("btn-info");
        buyButton.classList.toggle("btn-secondary");
        buyButton.innerHTML = "Wird verarbeitet...";
        setTimeout(function () {
            checkOrderAndSendData(event);
        }, 300);
    }
    function checkOrderAndSendData(_event) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", IceAge2019.address + "?newOrder" + generateJSONString(), true);
        xhr.addEventListener("readystatechange", handleStateChangeOrder);
        xhr.send();
    }
    function handleStateChangeOrder(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            const modal = document.getElementById("modal");
            modal.hidden = false;
        }
    }
    function generateJSONString() {
        const allArticles = getFormData();
        let query = JSON.stringify(allArticles);
        return query;
    }
    function closeConfirmation() {
        const modal = document.getElementById("modal");
        modal.hidden = true;
        const buyButton = document.getElementById("buy-button");
        buyButton.disabled = false;
        buyButton.classList.toggle("btn-info");
        buyButton.classList.toggle("btn-secondary");
        buyButton.innerHTML = "Kaufen";
    }
})(IceAge2019 || (IceAge2019 = {}));
//# sourceMappingURL=buyer.js.map