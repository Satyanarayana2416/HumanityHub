import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <div className="loader-container">
            <motion.div
                className="loader"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="loader__text">Loading...</p>
        </div>
    );
}
