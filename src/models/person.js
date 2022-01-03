import res, { get } from "express/lib/response";

const { query } = require("express");

const neo4j = require("neo4j-driver");
const uri = "neo4j+s://76ac02b8.databases.neo4j.io";
const user = "neo4j";
const password = "L6T2MYQKjafsBSEUzOyJCCILd_RCYJvWlphwvrpdrkw";
require("dotenv").config();

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

// session
//   .run(query)
//   .then((result) => {
//     result.records.forEach((record) => {
//       console.log(record.get("title"));
//     });
//     session.close();
//     driver.close();
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const findAll = async () => {
  const result = await session.run(`Match (p:Person) return p ORDER BY p.name`);
  return result.records.map((i) => i.get("p").properties);
};

const findById = async (id) => {
  const result = await session.run(`Match (s) WHERE id(s) = ${id} RETURN s`);
  return result.records.map((i) => i.get("s").properties);
};

const create = async (person) => {
  await session.run(`CREATE (p:Person {name: '${person.name}'}) return p`);
  return findAll();
};

const findByIdAndUpdate = async (id, person) => {
  const result = await session.run(
    // `MATCH (p:Person {id: '${id}'}) SET p.name = '${person.name}' return p.name`
    // `MATCH (s) WHERE id(s) = ${id} SET name= '${person.name}' return s`
    `MATCH (p:Person {id: ${id}})
    WITH p, p {.*} as snapshot
    SET p.name = '${person.name}' 
    return snapshot`
  );
  console.log(result);
  // return result.records[0].properties;
  // return result.records.map((i) => i.get("s").properties);
  return result;
};

const findByIdAndDelete = async (id) => {
  await session.run(`MATCH (p:Person) WHERE id(p) = ${id} DELETE p`);
  return await findAll();
};

export default {
  findAll,
  findById,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
};
