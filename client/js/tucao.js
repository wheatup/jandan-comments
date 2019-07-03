import commentService from './services/commentService.js';

export default class Tucao {
	constructor(id, comments) {
		this.id = id;
		this.comments = [...comments];

		this.pagination = {
			currentPage: 1,
			totalPage: 1,
			entryPerPage: 5,
			pageButtons: 5
		};

		this.$container = document.createElement('div');
		this.$container.classList.add('JC-Comments');
		this.$container.setAttribute('data-id', id);

		this.createCommentList();
		this.createCommentForm();
		this.updateCommentList();
	}

	/**
	 * 创建吐槽列表区域
	 * @param {Array} comments 吐槽数据
	 */
	createCommentList() {
		this.$commentList = document.createElement('ul');
		this.$container.append(this.$commentList);

		this.$pagination = document.createElement('ol');
		this.$container.append(this.$pagination);
	}



	/**
	 * 插入一条评论
	 * @param {Object} comment 
	 */
	createOneComment(comment) {
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
	}


	/**
	 * 创建吐槽输入区域
	 */
	createCommentForm() {
		this.$commentForm = document.createElement('from');
		this.$commentForm.classList.add('JC-Comments-Form');
		this.$commentForm.onsubmit = 'return false;';

		const header = document.createElement('header');
		const footer = document.createElement('footer');
		const btnSubmit = document.createElement('a');

		this.$textarea = document.createElement('textarea');

		btnSubmit.href = 'javascript: void(0);';
		btnSubmit.innerText = '发送';
		btnSubmit.addEventListener('click', () => this.postComment());
		footer.append(btnSubmit);

		this.$commentForm.append(header);
		this.$commentForm.append(this.$textarea);
		this.$commentForm.append(footer);

		this.$container.append(this.$commentForm);
	}

	/**
	 * 尝试发布吐槽
	 */
	async postComment() {
		let content = this.$textarea.value;
		if (!content || content.length < 4) {
			alert('你的太短');
		} else {
			let comment = await commentService.postComment(this.id, '蛋友', content);
			this.comments.push(comment);
			this.$textarea.value = '';
			this.updateCommentList();
			this.updateHeight();
		}
	}

	/**
	 * 显示/隐藏吐槽区域
	 */
	toggle() {
		// 防止第一次动画不显示，在下一帧添加动画
		setTimeout(() => {
			if (this.$container.classList.contains('on')) {
				this.$container.classList.remove('on');
			} else {
				this.$container.classList.add('on')
			}
			this.updateHeight();
		}, 0);
	}

	/**
	 * 更新吐槽
	 */
	updateCommentList() {
		this.$commentList.innerHTML = '';
		let start = (this.pagination.currentPage - 1) * this.pagination.entryPerPage;
		let end = start + this.pagination.entryPerPage;
		let list = this.comments.filter((c, i) => i >= start && i < end);
		list.forEach(comment => this.createOneComment(comment));

		this.updatePagination();
	}

	/**
	 * 更新分页
	 */
	updatePagination() {
		this.pagination.totalPage = Math.ceil(this.comments.length / this.pagination.entryPerPage);
		this.$pagination.innerHTML = '';
		let start, end;
		if (this.pagination.currentPage > this.pagination.totalPage * 0.5) {
			end = Math.min(this.pagination.currentPage + Math.floor(this.pagination.pageButtons / 2), this.pagination.totalPage);
			start = Math.max(end - this.pagination.pageButtons, 1);
		} else {
			start = Math.max(this.pagination.currentPage - Math.floor(this.pagination.pageButtons / 2), 1);
			end = Math.min(start + this.pagination.pageButtons, this.pagination.totalPage);
		}

		let li = document.createElement('li');
		li.innerText = '<';
		li.addEventListener('click', () => this.goPage(Math.max(this.pagination.currentPage - 1, 1)));
		this.$pagination.append(li);

		for (let i = start; i <= end; i++) {
			li = document.createElement('li');
			li.addEventListener('click', (_i => () => this.goPage(_i))(i));
			li.innerText = i;
			if (i === this.pagination.currentPage) {
				li.classList.add('on');
			}
			this.$pagination.append(li);
		}

		li = document.createElement('li');
		li.innerText = '>';
		li.addEventListener('click', () => this.goPage(Math.min(this.pagination.currentPage + 1, this.pagination.totalPage)));
		this.$pagination.append(li);
	}

	goPage(page) {
		this.pagination.currentPage = page;
		this.updateCommentList();
	}

	/**
	 * 更新元素的高度
	 */
	updateHeight() {
		if (this.$container.classList.contains('on')) {
			this.$container.style.setProperty('--height', this.$container.scrollHeight + 'px');
		} else {
			this.$container.style.setProperty('--height', '0px');
		}
	}
}