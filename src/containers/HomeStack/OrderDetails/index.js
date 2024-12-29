import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Header from '../../../components/Header'
import Assets from '../../../assets'



const index = ({navigation,route}) => {


    const order=route.params.orderDetails
    const orderDetail=route.params.orderDetails.datail[0]

    useEffect(()=>{
        console.log('ORDER DETAILS SCREEN PARAMS===>>>',route.params.orderDetails.datail[0])
    },[])


    return (
        <View style={styles.mainContainer}>
            <KeyboardAwareScrollView>
            <Header
                    containerStyle={{ backgroundColor: Assets.colors.appBg }}
                    hearderText={'Order Details'}
                    hearderTextStyle={{ color: Assets.colors.WHITE }}
                    leftIcon={Assets.images.back}
                    onLeftAction={()=>navigation.goBack()}
                />


                <View style={{marginHorizontal:20,marginTop:20}}>

                <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold'}}>{order.CustomerName.toUpperCase()}</Text>

        <Text style={{marginTop:20,fontSize:15,fontWeight:'bold'}}>Order For:  {orderDetail.categoryName ? orderDetail.categoryName : ''}</Text>

        <Text style={{marginTop:20,fontSize:17,fontWeight:'bold'}}>Note: </Text>
        <Text>{orderDetail.note}</Text>

                    <Text style={{alignSelf:'center',color:Assets.colors.appBg,fontSize:20,fontWeight:'bold'}}>Measurements</Text>



            {/* ==================== */}


                <View style={{height:300,justifyContent:'space-around'}}>

                {(orderDetail.measurement.collar!=null && orderDetail.measurement.collar!=0) &&  
                <Text style={styles.measureStyle}>Collar: {orderDetail.measurement.collar} </Text>
                }

{(orderDetail.measurement.length!=null && orderDetail.measurement.length!=0) &&
                <Text style={styles.measureStyle}>Length:{orderDetail.measurement.length}</Text>
}

{(orderDetail.measurement.chest!=null && orderDetail.measurement.chest!=0) && 
                <Text style={styles.measureStyle}>chest:{orderDetail.measurement.chest}</Text>
}

{(orderDetail.measurement.waist!=null && orderDetail.measurement.waist!=0) &&  
                <Text style={styles.measureStyle}>waist: {orderDetail.measurement.waist}</Text>
}
{(orderDetail.measurement.shoulder!=null && orderDetail.measurement.shoulder!=0 ) &&
                <Text style={styles.measureStyle}>shoulder: {orderDetail.measurement.shoulder}</Text>
}
{(orderDetail.measurement.sleeve_length!=null && orderDetail.measurement.sleeve_length!=0) &&  
                <Text style={styles.measureStyle}>Sleeves: {orderDetail.measurement.sleeve_length}</Text>
}
                {(orderDetail.measurement.hip!=null && orderDetail.measurement.hip!=0) &&
                <Text style={styles.measureStyle}>hip: {orderDetail.measurement.hip}</Text>
                }

{(orderDetail.measurement.daman!=null && orderDetail.measurement.daman!=0) &&  
                <Text style={styles.measureStyle}>Daman: {orderDetail.measurement.daman}</Text>
}

{(orderDetail.measurement.shalwar_length!=null && orderDetail.measurement.shalwar_length!=0) &&  
                <Text style={styles.measureStyle}>Shalwar Length: {orderDetail.measurement.shalwar_length}</Text>
}

{(orderDetail.measurement.shalwar_Bottom!=null &&  orderDetail.measurement.shalwar_Bottom!=0) &&  

                <Text style={styles.measureStyle}>shalwar Bottom: {orderDetail.measurement.shalwar_Bottom}</Text>
}

{(orderDetail.measurement.pent_length!=null && orderDetail.measurement.pent_length!=0) &&  
                <Text style={styles.measureStyle}>pentLength:{orderDetail.measurement.pent_length}</Text>
}
</View>

                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    measureStyle:{
        fontSize:15,
        fontWeight:'bold'
    }
})

