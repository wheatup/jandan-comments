class Tucao {

	constructor(id, comments) {
		this.id = id;
		this.comments = comments;

		this.$container = document.createElement('div');
		this.$container.classList.add('JC-Comments');
		this.$container.setAttribute('data-id', id);

		this.createCommentList();
		this.createCommentForm();
	}

	/**
	 * 创建吐槽列表区域
	 * @param {Array} comments 吐槽数据
	 */
	createCommentList() {
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

		this.$commentList = document.createElement('ul');

		// 创建吐槽
		this.comments.forEach(comment => {
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

			this.$commentList.append(li);
		});

		this.$container.append(this.$commentList);
	}



	/**
	 * 创建吐槽输入区域
	 */
	createCommentForm() {

		/*
		<form class="JC-Comments-Form" onsumbit="return false;">
			<header></header>
			<textarea></textarea>
			<footer>
				<a href="javascript:void(0)">发送</a>
			</footer>
		</form>
		*/

		this.$commentForm = document.createElement('from');
		this.$commentForm.classList.add('JC-Comments-Form');
		this.$commentForm.onsubmit = 'return false;';

		const header = document.createElement('header');
		const textarea = document.createElement('textarea');
		const footer = document.createElement('footer');
		const btnSubmit = document.createElement('a');
		btnSubmit.href = 'javascript: void(0);';
		btnSubmit.innerText = '发送';
		footer.append(btnSubmit);

		this.$commentForm.append(header);
		this.$commentForm.append(textarea);
		this.$commentForm.append(footer);

		this.$container.append(this.$commentForm);
	}

	/**
	 * 显示/隐藏吐槽区域
	 */
	toggle() {
		// 防止第一次动画不显示，在下一帧添加动画
		setTimeout(() => this.$container.classList.contains('on') ? this.$container.classList.remove('on') : this.$container.classList.add('on'), 0);
	}
}