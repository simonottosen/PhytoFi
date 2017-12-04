const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    padding: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',

  },
  listContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1
  },
  liImg: {
    flex: 0,
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 10,
    marginLeft: 50,
    justifyContent: 'center'
  },


  toolbar:{
    backgroundColor:'#81c04d',
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'row'    //Step 1
},
toolbarButton:{
    width: 50,            //Step 2
    color:'#fff',
    textAlign:'center'
},
toolbarTitle:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1                //Step 3
},

circles: {
  flexDirection: 'row',
  alignItems: 'center',
},
progress: {
  margin: 10,
},

listview: {
  flex: 1,

},

image: {
  width: 35, height: 35, marginLeft: 45, marginTop: 17,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,

},

imageInfo:{
  width: 25, height: 25, marginTop: 25,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  opacity: 0.5,
},



  li: {
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 50,
    marginBottom: 20,
      shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  
  

  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row',
    width: '100%'
  },
  navbarTitle: {
    flex: 2,
    color: '#444',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  form: {
    backgroundColor: '#f2f2f2'
  },
  title: {
    color: '#444',
    fontSize: 32,
    fontWeight: "500",
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#262626',
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
    height: 40
  },
  containerStyle: {
    height: 60,
    flexDirection: 'column',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
  },
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  alignRight: {
    flex: 1
  },

  boxView: {
   
    backgroundColor: '#fff'
  }, 
  drawer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    padding: 20
  },
  drawerButton: {
    margin: 10
  }
})
module.exports = styles
module.exports.constants = constants;