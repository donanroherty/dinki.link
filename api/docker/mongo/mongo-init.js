let res = [
  //   db.createUser({
  //     user: "$MONGO_API_USERNAME",
  //     pwd: "$MONGO_API_PASSWORD",
  //     roles: [
  //       {
  //         role: "readWrite",
  //         db: "dinkilink",
  //       },
  //     ],
  //   }),
  db.container.drop(),
  db.container.createIndex({ url: 1 }),
  db.container.createIndex({ shortID: 1 }),
  db.container.insert({ url: "ronandoherty.com", shortID: "AbcD", hits: 2 }),
  db.container.insert({ url: "https://google.com", shortID: "aBCd", hits: 1 }),
  db.container.insert({ url: "www.yahoo.com", shortID: "efgH", hits: 0 }),
]

printjson(res)
