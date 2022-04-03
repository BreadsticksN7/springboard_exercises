"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Job related functions */
class Job {
  /** Finds all jobs.
   * Returns [{ id, title, salary, equity, companyHandle}]
   * 
   * Queries can filter out specific jobs based on values
   */
  static async findAll(searchFilters = {}){
    let query = 
    `SELECT j.id,
            j.title,
            j.salary,
            j.equity,
            j.company_handle AS "companyHandle",
            c.name AS "companyName"
    FROM jobs j
    LEFT JOIN companies AS c on c.handle = j.company_handle`;

    let whereExpression = [];
    let queryValues = [];
    const { title, minSalary, hasEquity } = searchFilters;

    if(minSalary !== undefined){
      queryValues.push(minSalary);
      whereExpression.push(`salary >= $${queryValues.length}`);
    }

    if(hasEquity === true){
      queryValues.push(hasEquity);
      whereExpression.push(`equity > 0`);
    }

    if(title !== undefined){
      queryValues.push(`%${title}%`);
      whereExpression.push(`title ILIKE $${queryValues.length}`);
    }

    if(whereExpression.length > 0){
      query += " WHERE " + whereExpression.join(" AND ");
    }

    const jobRes = await db.query(query, queryValues);
    return jobRes.rows;
  }

  /** Creates a job (from data), updates the db, returns job data
   * Data should be {title, salary, equity, company_handle}
   * Returns {title, salary, equity, company_handle}
   */
  static async create({ title, salary, equity, company_handle }) {
    const results = await db.query(
      `INSERT INTO jobs
      (title, salary, equity, company_handle)
      VALUES ($1, $2, $3, $4)
      RETURNING title, salary, equity, company_handle`,
      [title, salary, equity, company_handle]
    );
    const jobs = results.rows[0];
    return jobs;
  }
  
  /** Get's the specific job by (id)
   * Returns id, title, salary, equity, companyHandle
   * 
   * Throws NotFoundEror if not found
   */
  static async get(id) {
    const jobRes = await db.query(
        `SELECT id,
                title,
                salary,
                equity,
                company_handle
        FROM jobs
        WHERE id = $1`,
        [id]
    );
    const job = jobRes.rows[0];
    if(!job) throw new NotFoundError(`No job found: ${id}`);

    /** Get's the company so it can be returne when viewing job details
     */
    const companiesRes = await db.query(
        `SELECT handle,
                name,
                description,
                num_employees AS "numEmployees",
                logo_url AS "logoUrl"
        FROM companies
        WHERE handle = $1`,
        [job.companyHandle]
    );
    delete job.companyHandle;
    job.company = companiesRes.rows[0];
    return job;
  }

  /**  Update the job data
   * Data can include title, salary, equity
   * Returns id, title, salary, equity, companyHandle
   * 
   * Throws NotFoundError when job isn't found
   */
  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE jobs
                        SET ${setCols}
                        WHERE id = ${idVarIdx}
                        RETURNING id,
                                  title,
                                  salary,
                                  equity,
                                  company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job found: ${id}`);
    return job;
  }

  /** Deletes job
   * Throws NotFoundError when job isn't found
   */
  static async remove(id) {
    const result = await db.query(
        `DELETE
        FROM jobs
        WHERE id = $1
        RETURNING id`,
        [id]
    );
    const job = result.rows[0];
    if(!job) throw new NotFoundError(`No job found: ${id}`);
  }
}


module.exports = Job;