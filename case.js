class Product {
  constructor(productId, productName, image, price, amount) {
    this.productId = productId;
    this.productName = productName;
    this.image = image;
    this.price = price;
    this.amount = amount;
  }
}
var products = [
  new Product(
    1,
    "Nike Mercurial Superfly 8 Academy TF Impulse Pack",
    "<img src = 'images/giay11.png'>",
    1999000,
    1
  ),
  new Product(
    2,
    "Nike Mercurial Superfly 7 Elite IC Daybreak",
    "<img src = 'images/giay2.png'>",
    3450000,
    1
  ),
  new Product(
    3,
    "NIKE MERCURIAL ZOOM VAPOR 14 PRO TF THE PROGRESS",
    "<img src = 'images/giay3.png'>",
    2750000,
    1
  ),
  new Product(
    4,
    "Adidas X Speedflow .1 TF Meteorite",
    "<img src = 'images/giay4.png'>",
    2499000,
    1
  ),
  new Product(
    5,
    "NIKE PHANTOM GT ACADEMY DF TF DAYBREAK",
    "<img src = 'images/giay5.png'>",
    2150000,
    1
  ),
];
function renderProduct() {
  let tbProduct = document.querySelector(".table>tbody");
  let htmls = products.map(function (product) {
    return `<tr id="tr_${product.productId}">
        <td>IDS-${product.productId}</td>
        <td class="namepdt">${product.productName}</td>
        <td>${product.image}</td>
        <td class="namepdt">${formatCurrency(product.price)}</td>
        <td>${product.amount}</td>
        <td id="action_${product.productId}">
          <button class="btn btn-warning" onclick="update(${
            product.productId
          })">Edit</button>
          <button class="btn btn-primary d-none" onclick="save(${
            product.productId
          })">Save</button>
          <button class="btn btn-warning d-none" onclick="cancel(${
            product.productId
          })">Cancel</button>
          <button class="btn btn-danger" onclick="del(${
            product.productId
          })">Delete</button>
        </td>
      <tr>`;
  });
  tbProduct.innerHTML = htmls.join("");
}

function addProduct() {
  let productName = document.querySelector("#productName").value;

  if (productName.length == 0) return alert("Xin vui lòng nhập tên sản phẩm");
  let image = document.querySelector("#image").value;
  let price = Number(document.querySelector("#price").value);

  if (price <= 0) return alert("Xin vui lòng nhập giá sản phẩm");

  let amount = document.querySelector("#amount").value;
  let productId = getLastestId() + 1;
  let newProduct = new Product(productId, productName, image, price, amount);
  products.push(newProduct);
  renderProduct();
  resetProduct();
}
function getLastestId() {
  let productTemp = [...products];
  let maxId = productTemp.sort(function (pdt1, pdt2) {
    return pdt2.productId - pdt1.productId;
  })[0].productId;
  return maxId;
}
function resetProduct() {
  document.querySelector("#productName").value = "";
  document.querySelector("#image").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#amount").value = "";
}
function formatCurrency(number) {
  return number.toLocaleString("vi", { style: "currency", currency: "VND" });
}
function del(productId) {
  let confirmed = window.confirm("Bạn có muốn xóa sản phẩm?");
  if (confirmed) {
    let position = products.findIndex(function (pdt) {
      return pdt.productId == productId;
    });
    products.splice(position, 1);
    renderProduct();
  }
}
function getProductById(pdtId) {
  return products.find(function (pdt) {
    return pdt.productId == pdtId;
  });
}
function update(pdtId) {
  let tr = document.getElementById(`tr_${pdtId}`);
  let product = getProductById(pdtId);
  tr.children[1].innerHTML = `<input class='form-control-md' type='text' value='${product.productName}'/>`;
  tr.children[2].innerHTML = `<input class='form-control-md' type='text' value='${product.image}'/>`;
  tr.children[3].innerHTML = `<input class='form-control-md' type='number' value='${product.price}'/>`;
  tr.children[4].innerHTML = `<input class='form-control-md' type='number' value='${product.amount}'/>`;
  let action = document.getElementById(`action_${pdtId}`);
  action.children[0].classList.add("d-none");
  action.children[1].classList.remove("d-none");
  action.children[2].classList.remove("d-none");
}
function cancel(pdtId) {
  let tr = document.getElementById(`tr_${pdtId}`);
  let product = getProductById(pdtId);
  tr.children[1].innerHTML = product.productName;
  tr.children[2].innerHTML = product.image;
  tr.children[3].innerHTML = formatCurrency(product.price);
  tr.children[4].innerHTML = product.amount;
  let action = document.getElementById(`action_${pdtId}`);
  action.children[0].classList.remove("d-none");
  action.children[1].classList.add("d-none");
  action.children[2].classList.add("d-none");
}
function save(pdtId) {
  let tr = document.getElementById(`tr_${pdtId}`);
  let product = getProductById(pdtId);
  let newProductName = tr.children[1].children[0].value;
  let newImage = tr.children[2].children[0].value;
  let newPrice = Number(tr.children[3].children[0].value);
  let newAmount = tr.children[4].children[0].value;
  product.productName = newProductName;
  product.image = newImage;
  product.price = newPrice;
  product.amount = newAmount;
  cancel(pdtId);
}
function ready() {
  renderProduct();
}
ready();
