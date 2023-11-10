const helpRequestFixtures = {
    oneHelpRequest:
    [
      {
        "id": "1",
        "requesterEmail" : "chrisgaucho@ucsb.edu",
        "teamId" : "team01",
        "tableOrBreakoutRoom" : "table",
        "requestTime": "2023-11-04T21:31:01",
        "explanation" : "Need help with dokku deployment",
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
            "requestTime": "2023-11-04T21:31:01",
            "explanation" : "Felt quirky",
            "solved" : "True"
        },

        {
            "id": 3,
            "requesterEmail" : "christianoguacho@ucsb.edu",
            "teamId" : "team03",
            "tableOrBreakoutRoom" : "table",
            "requestTime": "2023-11-04T21:31:01",
            "explanation" : "swagger bug",
            "solved" : "False"
        },

        {
            "id": 4,
            "requesterEmail" : "chris@ucsb.edu",
            "teamId" : "team04",
            "tableOrBreakoutRoom" : "table",
            "requestTime": "2023-11-04T21:31:01",
            "explanation" : "help",
            "solved" : "True"
        },
        
    ]
};

export { helpRequestFixtures };