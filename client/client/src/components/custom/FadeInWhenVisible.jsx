import { motion } from "framer-motion";

export const FadeInWhenVisible = ({
    children,
    delay = 0,
    className = "",
    ...props
}) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
            delay,
            duration: 0.6,
            ease: "easeOut",
        }}
        {...props}
    >
        {children}
    </motion.div>
);

export const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};