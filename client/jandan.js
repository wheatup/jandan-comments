[...document.querySelectorAll('.commentlist .tucao-btn')].map(btn => {
	replaceTucaoButton(btn);
});

/**
 * 所有吐槽的map
 * @key 无聊图id
 * @value 吐槽Element
 */
const tucaoMap = new Map();


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
	if (!tucaoMap.has(id)) {
		let { comments } = await getComments(id);
		// TODO: 需要更稳定的父元素
		let parent = target.parentElement.parentElement.parentElement;
		let tucao = createCommentDiv(id, comments);
		
		tucaoMap.set(id, tucao);
		parent.append(tucao);
	}
	toggleCommentsDiv(id);
}


/**
 * 创建吐槽组件
 * @param {Number|String} id 无聊图id
 */
function createCommentDiv(id, comments) {
	let container = document.createElement('div');
	container.classList.add('JC-Comments');
	container.setAttribute('data-id', id);

	container.append(createCommentsDiv(id, container, comments));
	container.append(createCommentInput(id, container));
	return container;
}


/**
 * 显示/隐藏吐槽区域
 * @param {Number|String} id 无聊图id
 */
function toggleCommentsDiv(id) {
	const target = tucaoMap.get(id);
	if (target) {
		// 防止第一次动画不显示，在下一帧添加动画
		setTimeout(() => target.classList.contains('on') ? target.classList.remove('on') : target.classList.add('on'), 0);
	}
}


/**
 * 创建吐槽区域
 * @param {Number|String} id 无聊图id
 * @param {HTMLElement} target 追加的父元素
 * @param {Array} comments 吐槽
 */
function createCommentsDiv(id, target, comments) {
	/* 
	<ul>
		<li>
			<header>
				<span>wheatup</span>
				<span>2019-7-2 12:00:12</span>
			</header>
			<p>测试测试测试测试测试测试3</p>
			<footer>
				<span>[122]</span>
				<span>[0]</span>
			</footer>
		</li>
	</ul>
	*/

	let ul = document.createElement('ul');

	// 创建吐槽
	comments.forEach(comment => {
		let li = document.createElement('li');

		// TODO: 安全性Escape
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

	return ul;
}


/**
 * 创建吐槽输入区域
 * @param {Number|String} id 无聊图id
 * @param {HTMLElement} target 追加的父元素
 */
function createCommentInput(id, target) {

	/*
	<form class="JC-Comments-Form" onsumbit="return false;">
		<header></header>
		<textarea></textarea>
		<footer>
			<a href="javascript:void(0)">发送</a>
		</footer>
	</form>
	*/

	const form = document.createElement('from');
	form.classList.add('JC-Comments-Form');
	form.onsubmit = 'return false;';

	const header = document.createElement('header');
	const textarea = document.createElement('textarea');
	const footer = document.createElement('footer');
	const btnSubmit = document.createElement('a');
	btnSubmit.href = 'javascript: void(0);';
	btnSubmit.innerText = '发送';
	footer.append(btnSubmit);

	form.append(header);
	form.append(textarea);
	form.append(footer);

	return form;
}