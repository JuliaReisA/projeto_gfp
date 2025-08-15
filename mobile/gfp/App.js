import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './src/pages/Login';
import MenuDrawer from './src/pages/MenuDrawer';
import CadContas from './src/pages/CadContas';


const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
                heaaderStyle: {
                    backgroundColor: '#cfbaf0',
                    elevation: 0,
                },
                headerTintColor: '#black',
             }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MenuDrawer" component={MenuDrawer}   options={{headerShown: false}} />
        <Stack.Screen name="CadContas" component={CadContas} 
        options={{title: 'Cadastro de contas'}} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}