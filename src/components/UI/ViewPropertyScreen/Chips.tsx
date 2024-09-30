import { useContext } from 'react';
import { View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { statusTable } from '../../../helpers';
import { PropertyGetData } from '../../../interfaces/appInterfaces';
import { AuthContext } from '../../../context';

export function Chips({ propertyData }: { propertyData: PropertyGetData }) {
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Chip
          style={{ backgroundColor: theme.colors.background }}
          icon="pricetag-outline"
        >
          {propertyData.oportunityType === 'R' ? 'Alquiler' : 'Venta'}
        </Chip>
      </View>

      {user?.userId === propertyData.user[0].userId && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Chip
            style={{
              backgroundColor:
                propertyData.status === 'I'
                  ? theme.colors.danger
                  : propertyData.status === 'A'
                  ? theme.colors.success
                  : theme.colors.background
            }}
            icon="lock-open-outline"
          >
            {statusTable[propertyData.status]}
          </Chip>
        </View>
      )}
    </View>
  );
}
