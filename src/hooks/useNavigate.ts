import { useNavigation, useLinkTo } from '@react-navigation/native';

const useNavigationFunction = (url: string) => {
    const linkTo = useLinkTo();
    const navigate = () => {
        linkTo(url);
    };

    return navigate;
}

export default useNavigationFunction;