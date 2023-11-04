const helpRequestFixtures = {
    oneHelpRequest:
    [
      {
        "id": 1,
        "requesterEmail" : "chrisgaucho@ucsb.edu",
        "teamId" : "team01",
        "tableOrBreakoutRoom" : "table",
        "requestTime": "2023-11-04T21:31:01.212Z",
        "explanation" : "dokku deployment",
        "solved" : "True"
      }
    ],

    threeHelpRequests:
    [
        {
            "id": 2,
            "requesterEmail" : "christinagaucho@ucsb.edu",
            "teamId" : "team02",
            "tableOrBreakoutRoom" : "breakoutRoom",
            "requestTime": "2023-11-04T21:31:01.212Z",
            "explanation" : "Felt quirky",
            "solved" : "True"
        },

        {
            "id": 3,
            "requesterEmail" : "christianoguacho@ucsb.edu",
            "teamId" : "team03",
            "tableOrBreakoutRoom" : "team03",
            "requestTime": "2023-11-04T21:31:01.212Z",
            "explanation" : "swagger bug",
            "solved" : "False"
        },

        {
            "id": 4,
            "requesterEmail" : "@ucsb.edu",
            "teamId" : "",
            "tableOrBreakoutRoom" : "",
            "requestTime": "2023-11-04T21:31:01.212Z",
            "explanation" : "",
            "solved" : "True"
        },
        
    ]
};

export { helpRequestFixtures };