let quizCategories = [
    {topic: "General Knowledge", id: 9},
    {topic: "Sports", id: 21},
    {topic: "History", id: 23},
    {topic: "Politics", id: 24},
    {topic: "Arts", id: 25},
    {topic: "Celebrities", id: 26},
    {topic: "Animals", id: 27},
    {
        categoryGroup: "Entertainment",
        categories: [
            {topic: "Books", id: 10},
            {topic: "Film", id: 11},
            {topic: "Music", id: 12},
            {topic: "Television", id: 14},
            {topic: "Video Games", id: 15},
            {topic: "Board Games", id: 16}
        ]
    },
    {
        categoryGroup: "Science",
        categories: [
            {topic: "Nature", id: 17},
            {topic: "Computers", id: 18},
            {topic: "Mathematics", id: 19},
            {topic: "Mythologies", id: 20}
        ]
    }
];


let difficulties = [
    {difficulty:"easy"},
    {difficulty:"medium"},
    {difficulty:"hard"},
];

export {quizCategories, difficulties};
