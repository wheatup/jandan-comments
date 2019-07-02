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