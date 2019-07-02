// window.onload = function(){
[...document.querySelectorAll('.commentlist .tucao-btn')].map(btn => {
	replaceTucaoButton(btn);
});
// };

const openedTucao = {};

function replaceTucaoButton(replacement) {
	// 查找id
	let parent = replacement;
	while ((parent = parent.parentElement) && parent && parent.nodeName !== 'LI') { }
	if (parent) {
		// 创建新吐槽按钮
		const btn = document.createElement('a');
		btn.innerText = '吐槽';
		btn.href = 'javascript: void(0)';
		btn.classList.add('JC-TucaoButton');
		btn.addEventListener('click', onClickTucao);

		let idRaw = parent.getAttribute('id');
		let test, id;
		if (idRaw && (test = /^comment-(\d+)$/.exec(idRaw))) {
			id = test[1];
			btn.setAttribute('data-id', id);
		}

		replacement.insertAdjacentElement('afterend', btn);
		replacement.remove();
		return btn;
	} else {
		console.error('找不到无聊图id', replacement);
	}
}

async function onClickTucao({ target }) {
	let id = target.getAttribute('data-id');
	if (typeof openedTucao[id] === 'undefined') {
		let { comments } = await getComments(id);
		createCommentsDiv(id, target.parentElement.parentElement.parentElement, comments);
	}
	toggleCommentsDiv(id, !openedTucao[id]);
	openedTucao[id] = !openedTucao[id];
}

function toggleCommentsDiv(id, open) {
	const target = document.querySelector(`.JC-Comments[data-id='${id}']`);
	if (target) {
		open ? target.classList.add('on') : target.classList.remove('on');
	}
}

function createCommentsDiv(id, target, comments) {
	let div = document.createElement('div');
	div.classList.add('JC-Comments');
	div.setAttribute('data-id', id);

	let ul = document.createElement('ul');

	comments.forEach(comment => {
		let li = document.createElement('li');

		li.innerHTML = `
			<header>
				<span>${comment.author}</span>
				<span>${comment.date}</span>
			</header>
			<p>${comment.content}</p>
			<footer>
				<span>[${comment.likes}]</span>
				<span>[${comment.dislikes}]</span>
			</footer>
		`;

		ul.append(li);
	});

	div.append(ul);
	target.append(div);
}