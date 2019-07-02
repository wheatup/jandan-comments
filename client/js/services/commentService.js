var commentService;

(()=>{
	const fakeComments = [
		{
			id: 123456,
			comments: [
				{
					id: '1',
					author: 'wheatup',
					date: '2019-7-2 12:00:12',
					content: `测试测试测试测试测试测试3`,
					likes: 122,
					dislikes: 0
				}, {
					id: '2',
					author: 'wheatup',
					date: '2019-7-2 12:00:10',
					content: `测试测试测试测试测试测试2`,
					likes: 1,
					dislikes: 1
				}, {
					id: '3',
					author: 'wheatup',
					date: '2019-7-2 12:00:04',
					content: `测试测试测试测试测试测试1`,
					likes: 1,
					dislikes: 0
				}
			]
		}
	];


	function getComments(id) {
		return new Promise((resolve, reject) => {
			resolve(fakeComments[0]);
		});
	}

	function postComment(id, author, content) {
		return new Promise((resolve, reject) => {
			let comments = fakeComments[0].comments;
			let comment = {
				id: comments.length + 1,
				author,
				content,
				date: new Date().toLocaleDateString('zh-CN', {hour12: false, hour: '2-digit', minute: '2-digit', 'second': '2-digit'}),
				likes: 0,
				dislikes: 0
			};

			comments.push(comment);

			resolve(comment);
		});
	}

	commentService = {
		getComments,
		postComment
	};
})();

if(typeof module !== undefined){
	module.exports = commentService;
}