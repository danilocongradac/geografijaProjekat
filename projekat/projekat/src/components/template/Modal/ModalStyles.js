const styles = {
    modalContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start',
        padding: "24px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        right: "100px",
        top:'100px',
        width:'500px',
        minHeight:'300px',
        maxHeight:'700px',
        overflow:'auto',
        zIndex: "20000",
        fontFamily: "Arial, sans-serif",
        color: "#333"
    },

    modalHeading:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center'
    },

    closeIcon:{
        width:'24px',
        height:'24px',
        cursor:'pointer'
    }
};
  
export default styles;
  