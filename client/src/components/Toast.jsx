import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <FiCheckCircle size={20} />,
        error: <FiAlertCircle size={20} />,
    };

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    className={`toast toast--${type}`}
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -50, x: '-50%' }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="toast__icon">{icons[type]}</span>
                    <span className="toast__message">{message}</span>
                    <button className="toast__close" onClick={onClose}><FiX size={16} /></button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
