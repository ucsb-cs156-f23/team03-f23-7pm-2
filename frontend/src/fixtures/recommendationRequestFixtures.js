const recommendationRequestFixtures = {
    oneRecommendation: {
        "id": 1,
        "requesterEmail": "requesterEmail1",
        "professorEmail": "professorEmail1",
        "explanation": "explanation1",
        "dateRequested": "2023-11-02T00:00:00",
        "dateNeeded": "2023-11-02T00:00:00",
        "done": false,
    },
    threeRecommendation: [
        {
            "id": 1,
            "requesterEmail": "requesterEmail1",
            "professorEmail": "professorEmail1",
            "explanation": "explanation1",
            "dateRequested": "2023-11-02T00:00:00",
            "dateNeeded": "2023-11-02T00:00:00",
            "done": false,
        },
        {
            "id": 2,
            "requesterEmail": "requesterEmail2",
            "professorEmail": "professorEmail2",
            "explanation": "explanation2",
            "dateRequested": "2023-11-02T00:00:00",
            "dateNeeded": "2023-11-02T00:00:00",
            "done": false,
        },
        {
            "id": 3,
            "requesterEmail": "requesterEmail3",
            "professorEmail": "professorEmail3",
            "explanation": "explanation3",
            "dateRequested": "2023-11-02T00:00:00",
            "dateNeeded": "2023-11-02T00:00:00",
            "done": false,
        }
    ]
};


export { recommendationRequestFixtures };