const router = require('express').Router();
const Currency = require('../model/Currency');
const History = require('../model/History');
const Joi = require('joi');

router.get('/latest', async (req, res) => {
  try {
    const query = req.query;
    if (Object.keys(query).length === 0) {
      await Currency.find({ base: 'EUR' }, (error, result) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(result);
      });
    } else if (Object.keys(query).length === 1) {
      const querySchema = Joi.object().keys({
        base: Joi.string().min(3).max(3).required(),
      });
      const result = querySchema.validate(query);
      const { value, error } = result;
      const valid = error == null;
      if (!valid) {
        return res.status(422).json({ error: 'invalid query' });
      } else {
        await Currency.find(req.query, (error, result) => {
          if (error) return res.status(400).json(error);
          result.sort();
          return res.status(200).json(result);
        });
      }
    } else {
      const querySchema = Joi.object().keys({
        base: Joi.string().min(3).max(3).required(),
        symbol: Joi.string().min(3).max(3).required(),
      });
      const result = querySchema.validate(query);
      const { value, error } = result;
      const valid = error == null;
      if (!valid) {
        return res.status(422).json({ error: 'invalid query' });
      } else {
        await Currency.find(
          {
            base: req.query.base,
          },
          (error, result) => {
            if (error) {
              return res.status(400).json(error);
            }

            const obj = {
              toCurr: { [req.query.symbol]: result[0].rates[req.query.symbol] },
              fromCurr: req.query.base,
              updated: result[0].date,
              requested: new Date().toLocaleString(),
            };
            console.log(obj);
            return res.status(200).json(obj);
          }
        );
      }
    }
  } catch (err) {
    return res.status(400).json({ error: 'something went wrong.' });
  }
});

// router.get('/specific', async (req, res) => {
// 	const queryOptions = req.params;
// 	console.log(queryOptions, 'lol');
// 	const symbols = Object.values(queryOptions);
// 	console.log(symbols);
// 	await Currency.findOne({ Base: symbols }, (error, result) => {
// 		if (error) return res.status(400).json(error);
// 		console.log(result);
// 		return res.status(201).json(result);
// 	});
// });

router.get('/history', async (req, res) => {
  const userQuery = req.query.date;
  if (userQuery === undefined)
    return res.status(400).json('No query params detected!');
  const formatDate = new Date(userQuery);
  // const endDate = new Date(end);

  await History.findOne({ date: formatDate }, (error, result) => {
    if (error) return res.status(400).json(error);
    res.status(200).json(result);
    console.log(result);
  });
});

// router.get('/specific', async (req, res) => {
// 	const query = {
// 		symbol: req.query.symbol,
// 		base: req.query.base,
// 		date: req.query.date || Date.now(),
// 	};
// 	if (!query) return res.status(400).json({ error: 'invalid query' });
// 	try {
// 		const queryResp = await History.find({
// 			symbol: symbol,
// 			date: { $eq: date },
// 			base: base,
// 		});
// 		console.log(queryResp);
// 		res.status(200).json(queryResp);
// 	} catch (err) {
// 		return res.status(400).json(err);
// 	}
// });

module.exports = router;
