const modalStyles = {
    overlay: {
        zIndex: '999',
        background: "rgba(0,0,0,.4)",
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'none',
        bottom: 'none',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '15px'
    }
};

export default modalStyles;