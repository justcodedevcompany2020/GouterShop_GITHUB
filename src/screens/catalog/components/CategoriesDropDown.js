import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
  Platform,
  View,
  ImageBackground,
} from 'react-native';
import { Styles } from '../../../styles/Styles';
import { AppColors } from '../../../styles/AppColors';
import { ArrowDownIcon, ArrowUpIcon } from '../../../../assets/svgs/CatalogSvgs';
import { url } from '../../../api/RequestHelpers';
import { Dimensions } from 'react-native';

export default function CategoriesDropDown({ data, defaultOpenedId, navigation }) {
  const [selectedItem, setSelectedItem] = useState(defaultOpenedId);
  const { width } = Dimensions.get('window')

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  function onSelect(id) {
    if (id === selectedItem) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(id);
  }

  function toggleExpand() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  const Categories = ({ data, isOpened, onPress }) => {
    return (
      <>
        <TouchableOpacity
          style={styles.blockContainer}
          onPress={onPress}>
          <View>
            <Text style={Styles.blackSemiBold18}>{data.title}</Text>
          </View>
          {isOpened ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </TouchableOpacity>
        {isOpened && (
          <View style={styles.categoriesContainer}>
            {data.subcategories.map((item, i) => <TouchableOpacity style={[styles.categoryContainer, { marginRight: (width - 40 - 315) / 3, }]} key={i} onPress={() => navigation.navigate('CategoryScreen', { id: item.id, title: item.title })}>
              <ImageBackground source={{ uri: `${url}uploads/${item.image}` }} resizeMode="cover" style={styles.image} borderRadius={10} >
                <View style={styles.blackBack}>
                  <Text style={styles.categoryName}>{item.title}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>)}
          </View>
        )}
      </>
    );
  };
  return data.map((item, i) => <Categories key={i} data={item} isOpened={selectedItem === item.id} onPress={() => { onSelect(item.id); toggleExpand() }} />)
}

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    height: 25,
    marginTop: 25,
  },
  categoriesContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    borderRadius: 10,
    width: 105,
    height: 90,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 90,
  },
  categoryName: {
    color: AppColors.WHITE_COLOR,
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
    margin: 8,
  },
  blackBack: {
    backgroundColor: '#00000060',
    borderRadius: 10,
    height: '100%',
},
});
