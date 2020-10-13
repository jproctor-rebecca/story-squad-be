const router = require('express').Router();

const { dsAuthMiddleware } = require('../middleware');
const { ops } = require('../../lib');

const DS = require('./dsModel');

/**
 * Data types for DS endpoints
 * @swagger
 * components:
 *  schemas:
 *    Complexity:
 *      type: integer
 *      example: 300
 *
 *  parameters:
 *    Complexity:
 *      in: query
 *      name: complexity
 *      schema:
 *        $ref: '#/components/schemas/Complexity'
 *      required: true
 *      description: Complexity calculation for a submission
 */

/**
 * @swagger
 * /data/complexity/{id}?complexity={complexity}:
 *  put:
 *    summary: Attempts to update the complexity of the relevant submission
 *    tags:
 *      - Data Science
 *    parameters:
 *      - $ref: '#/components/parameters/submissionId'
 *      - $ref: '#/components/parameters/Complexity'
 *    responses:
 *      204:
 *        $ref: '#/components/responses/EmptySuccess'
 *      400:
 *        $ref: '#/components/responses/MissingParams'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.put('/complexity/:id', dsAuthMiddleware, async (req, res) => {
  // Pull the relevant data form the request
  const { id } = req.params;
  const complexity = req.query.complexity;

  // Allows the data science team to set a complexity store on a submission
  ops.update(res, DS.setComplexity, 'Submission', id, complexity);
});

/**
 * @swagger
 * /data/clusters:
 *  get:
 *    summary: This endpoint triggers a query to the DSAPI that sends submissions,
 *      receives clusters, and stores clusters in our database.
 *    tags:
 *      - Data Science
 *    responses:
 *      200:
 *        $ref: '#/components/responses/EmptySuccess'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/clusters', dsAuthMiddleware, async (req, res) => {
  ops.getAll(res, DS.clusterGeneration, 'Cluster');
});

module.exports = router;
