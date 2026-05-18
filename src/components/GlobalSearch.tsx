import { IconsSearch } from "@/assets/Icons"
import { TextInput, View } from "react-native"
import { SvgXml } from "react-native-svg"
import tw from "../lib/tailwind"
interface SearchProps { placeholder: string, value: string, onChangeText: (text: string) => void, onClear: () => void }

const GlobalSearch: React.FC<SearchProps> = ({
    placeholder,
    value,
    onChangeText,
    onClear
}) => {
    return (
        <View style={tw`gap-6`}>
            <View style={tw` w-full flex-row items-center border-borderPrimary rounded-xl border px-2 gap-2`}>
                <SvgXml xml={IconsSearch} />
                <TextInput
                    style={tw`flex-1 h-12 items-center justify-center text-text16 text-headingText`}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#888"
                    clearButtonMode="while-editing"
                    returnKeyType="search"
                    autoCapitalize="none"
                />
            </View>
        </View>
    )
}

export default GlobalSearch;