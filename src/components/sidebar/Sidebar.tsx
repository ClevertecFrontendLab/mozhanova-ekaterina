import { EditIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import styles from './Sidebar.module.scss';

export function Sidebar() {
    return (
        <Flex className={styles.sidebar_wrap} direction='column' justifyContent='space-between'>
            <Flex direction='column' gap='24px'>
                <div className={styles.counter}>
                    <img src='/src/assets/icons/BookmarkHeart.svg' alt='' />
                    <div>185</div>
                </div>
                <div className={styles.counter}>
                    <img src='/src/assets/icons/People.svg' alt='' />
                    <div>589</div>
                </div>
                <div className={styles.counter}>
                    <img src='/src/assets/icons/EmojiHeartEyes.svg' alt='' />
                    <div>587</div>
                </div>
            </Flex>
            <div className={styles.edit}>
                <div className={styles.edit_icon}>
                    <EditIcon color='#ffffd3' width='22px' height='22px' />
                </div>
                <div className={styles.edit_text}>Записать рецепт</div>
            </div>
        </Flex>
    );
}
