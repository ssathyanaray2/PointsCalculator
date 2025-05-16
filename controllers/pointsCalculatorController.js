import pool from '../database/databaseConfig.js';
import { v4 as uuidv4 } from 'uuid';
import calculatePoints from '../utils/helper.js';

const getPoints = async (req, res) => {
  const userId = req.params.userId;
  console.log('user id received: ' + userId);

  try {
    pool.query('SELECT points FROM receipts WHERE id = ?', userId, (error, results) => {
      if (results.length === 0) return res.status(404).send('No receipt found for that ID.');
      if (error) return res.status(404).send('No receipt found for that ID.');
      return res.status(200).json({"points" : results[0].points.toString()});
    })
  } catch (error) {
    console.error('Error fetching points:', error);
    return res.status(500).send('Internal server error');
  }
}

const processReceipt = async (req, res) => {
  const receipt = req.body;
  const receiptId = uuidv4();

  try {
    const points = calculatePoints(receipt);

    if (points === -1) {
      console.warn('Invalid receipt data received:', receipt);
      return res.status(400).send('The receipt is invalid.');
    }

    const insertReceiptQuery = `
      INSERT INTO receipts (id, retailer, purchase_date, purchase_time, total, points)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    pool.query(insertReceiptQuery, [
      receiptId,
      receipt.retailer,
      receipt.purchaseDate,
      receipt.purchaseTime,
      receipt.total,
      points
    ],
    (error, _) => {
      if (error) {
        console.error('Error inserting receipt:', err.message);
        return res.status(500).send('Failed to process receipt.');
      }

      console.log('successfully processed the receipts, now adding items');
    });
    

    const insertItemQuery = `
      INSERT INTO items (receipt_id, short_description, price)
      VALUES ?
    `;

    const itemValues = receipt.items.map(item => [
      receiptId,
      item.shortDescription,
      item.price
    ]);
    pool.query(insertItemQuery, [itemValues], (error, _) => {
      if (error) {
        console.error('Error processing receipt:', error);
        return res.status(500).send('Error processing receipt');
      }

      console.log('successfully processed the receipts');
    });


    return res.status(200).json({"id" : receiptId});

  } catch (err) {
    console.error('Failed to process receipt due to', err.message);
    return res.status(500).send('Failed to process receipt.');
  }
};


export default {getPoints, processReceipt};