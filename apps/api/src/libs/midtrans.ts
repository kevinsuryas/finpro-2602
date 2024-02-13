// @ts-ignore
import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';
dotenv.config()

export const createTransactionMidtrans = async () => {

    let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-SRD0XvB10FQmSi2cPURM7KaL"
    });

    let parameter = {
        transaction_details: {
            order_id: Math.floor(Math.random() * 999),
            gross_amount: 10000
        },
        credit_card: {
            secure: true
        },
        customer_details: {
            first_name: "budi",
            last_name: "pratama",
            email: "budi.pra@example.com",
            phone: "08111222333"
        }
    };

    try {
        const transaction = await snap.createTransaction(parameter)
        return transaction
    } catch (error) {
        console.log(error)
    }
}