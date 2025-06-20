import { Avatar, AvatarBadge, ResponsiveValue } from '@chakra-ui/react';

import { PictureIcon } from './icons/PictureIcon';

type Props = {
    src: string;
    firstName: string;
    lastName: string;
    size: ResponsiveValue<'md' | 'xl' | '2xl'>;
    alignSelf: ResponsiveValue<string>;
    badge: boolean;
    onBadgeClick: VoidFunction;
};

export const UiAvatar = ({
    src,
    firstName = '',
    lastName = '',
    size = { base: 'xl', md: '2xl' },
    badge,
    onBadgeClick,
    ...props
}: Partial<Props>) => (
    <Avatar src={src} name={`${firstName} ${lastName}`} size={size} {...props}>
        {badge && (
            <AvatarBadge
                onClick={onBadgeClick}
                cursor='pointer'
                borderWidth='4px'
                boxSize='35px'
                bg='neutral.400'
            >
                <PictureIcon />
            </AvatarBadge>
        )}
    </Avatar>
);
