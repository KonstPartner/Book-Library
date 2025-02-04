import fs from 'fs';
import csvParser from 'csv-parser';
import { BATCH_SIZE } from '../../../seed/import/config.ts';

export default async (callback: any, csvPath: string, table: string) => {
  const rowsBuffer: any[] = [];
  let index = 0;

  const processBatch = async () => {
    const dataPromises = rowsBuffer.map(async (row) => {
      try {
        await callback(row);
        index++;
      } catch (error) {
        console.error(`Error processing row: ${JSON.stringify(row)}`, error);
      }
    });

    await Promise.all(dataPromises);
    console.log(`${table}: batches processed: ` + index);
    rowsBuffer.length = 0;
  };

  const stream = fs
    .createReadStream(csvPath)
    .pipe(csvParser())
    .on('data', async (row) => {
      rowsBuffer.push(row);

      if (rowsBuffer.length >= BATCH_SIZE) {
        stream.pause();
        processBatch().then(() => stream.resume());
      }
    })
    .on('end', async () => {
      if (rowsBuffer.length > 0) {
        await processBatch();
      }
      console.log(`${table} have been added to the database!`);
    })
    .on('error', (error) => {
      console.error(`Error during ${table} CSV file parsing: `, error);
    });
};
