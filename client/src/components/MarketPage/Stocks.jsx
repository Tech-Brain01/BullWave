import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/Table"; // Corrected import path from "./Tab.jsx" to "./Table.jsx"
import { Button } from '../ui/Button';

const Stocks = ({ stocks }) => {
    return (
        <Table>
            <TableCaption>A list of stocks in the market.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Live Price (LTP)</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>% Change</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {stocks && stocks.length > 0 ? (
                    stocks.map((stock) => (
                        <TableRow key={stock.instrumentKey}>
                            <TableCell className="font-medium">{stock.name || 'N/A'}</TableCell>
                            <TableCell>{stock.symbol}</TableCell>
                            <TableCell>₹{stock.ltp ? stock.ltp.toFixed(2) : 'N/A'}</TableCell>
                            <TableCell className={stock.change > 0 ? 'text-green-500' : 'text-red-500'}>
                                {stock.change ? stock.change.toFixed(2) : 'N/A'}
                            </TableCell>
                            <TableCell className={stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>
                                {stock.changePercent ? stock.changePercent.toFixed(2) : 'N/A'}%
                            </TableCell>
                            <TableCell>{stock.volume ? stock.volume.toLocaleString('en-IN') : 'N/A'}</TableCell>
                            <TableCell className="text-right">
                                <Button>Trade</Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan="7" className="text-center">
                            Waiting for market data...
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default Stocks;