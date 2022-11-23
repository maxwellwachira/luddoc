import { body } from "express-validator";

class MpesaValidator {
    checkB2C() {
        return [
            body('amount')
                .notEmpty()
                .withMessage('amount should not be empty')
                .isDecimal()
                .withMessage('should be valid amount of money'),
            body('partyB')
                .notEmpty()
                .withMessage('phone number should not be empty'),
            body('remarks')
                .notEmpty()
                .withMessage('remarks should not be empty'),
        ];
    }

    checkC2B() {
        return [
            body('amount')
                .notEmpty()
                .withMessage('amount should not be empty')
                .isDecimal()
                .withMessage('should be valid amount of money'),
            body('msisdn')
                .notEmpty()
                .withMessage('phone number should not be empty'),
            body('accountNumber')
                .notEmpty()
                .withMessage('accountNumber should not be empty'),
        ];
    }

    checkTransactionStatus() {
        return [
            body('transactionId')
                .notEmpty()
                .withMessage('transactionId should not be empty'),
        ];
    }

    checkLipaNaMpesa() {
        return [
            body('amount')
                .notEmpty()
                .withMessage('amount should not be empty')
                .isDecimal()
                .withMessage('should be valid amount of money'),
            body('phoneNumber')
                .notEmpty()
                .withMessage('phone number should not be empty'),
            body('accountNumber')
                .notEmpty()
                .withMessage('accountNumber should not be empty'),
        ];
    }

    checkReversal() {
        return [
            body('amount')
                .notEmpty()
                .withMessage('amount should not be empty')
                .isDecimal()
                .withMessage('should be valid amount of money'),
            body('transactionId')
                .notEmpty()
                .withMessage('transactionId should not be empty'),
        ];
    }
}

export default new MpesaValidator();