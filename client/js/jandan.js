/**
 * 所有吐槽的map
 * @key 无聊图id
 * @value 吐槽Element
 */
const tucaoMap = new Map();

window.onload = function(){
	[...document.querySelectorAll('.commentlist .tucao-btn')].map(btn => {
		replaceTucaoButton(btn);
	});
}

/**
 * 替换吐槽按钮
 * @param {HTMLElement} replacement 需要被替换的元素
 */
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


/**
 * 用户点击吐槽按钮
 * @param {Object} e 点击按钮事件对象
 */
async function onClickTucao({ target }) {
	let id = target.getAttribute('data-id');
	let tucao = tucaoMap.get(id);
	if (!tucao) {
		let { comments } = await commentService.getComments(id);

		tucao = new Tucao(id, comments);
		tucaoMap.set(id, tucao);

		// TODO: 需要更稳定的父元素
		let parent = target.parentElement.parentElement.parentElement;
		parent.append(tucao.$container);
	}
	tucao.toggle();
}