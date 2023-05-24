const projects = [
  {
    name: "qr-code-component-main",
    url: "https://qr-code-01.netlify.app",
    imgPath: "qr-code-component-main",
  },
  {
    name: "age-calculator-app-main",
    url: "https://age-calculator-app01.netlify.app",
    imgPath: "age-calculator-app-main/src/assets",
  },
];

const list = document.getElementById("list");

projects.forEach(({ name, url, imgPath }, i) => {
  const listItem = document.createElement("li");

  listItem.innerHTML = `
		<a href="${url}">
			<img src="/${imgPath}/images/desktop-preview.jpg" alt="${name}" />
			<p>${i + 1}. ${formatProjectName(name)}</p>
		</a>

		<div class="links-container">
			<a href="${url}" class="blue">
				<i class="fas fa-eye" ></i>
			</a>
		</div>
	`;

  list.appendChild(listItem);
});

function formatProjectName(name) {
  return name
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
