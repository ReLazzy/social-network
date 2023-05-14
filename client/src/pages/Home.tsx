import { useLocation, useRouter } from '@happysanta/router';
import {
  Icon28ClipOutline,
  Icon28MessageOutline,
  Icon28NewsfeedOutline,
  Icon28UserCircleOutline,
  Icon28UsersOutline,
  Icon56NewsfeedOutline,
} from '@vkontakte/icons';
import {
  Badge,
  Cell,
  Counter,
  Epic,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Platform,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  View,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui';

import { useEffect, useState } from 'react';
import Message from '../components/Message';
import Feed from '../panel/Feed';
import Friends from '../panel/Friends';
import Messages from '../panel/Messages';
import Profile from '../panel/Profile';
import {
  PAGE_PROFILE,
  PANEL_EDIT,
  PANEL_FEED,
  PANEL_FRIENDS,
  PANEL_MESSAGES,
  PANEL_PROFILE,
  VIEW_FEED,
  VIEW_FRIENDS,
  VIEW_MESSAGES,
  VIEW_PROFILE,
} from '../routes';

import Modal from '../components/modals/Modal';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import PanelEdit from '../components/modals/ModalEdit';

interface HomeProps {
  activeStory: string;
  setActiveStory: (value: React.SetStateAction<string>) => void;
}
const Home = (props: HomeProps) => {
  const { username } = useAppSelector((state) => state.authReducer);
  const router = useRouter();
  const { activeStory, setActiveStory } = props;
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();

  const onStoryChange = (e: any) => {
    const newActiveStory = e.currentTarget.dataset.story;
    setActiveStory(newActiveStory);
    if (newActiveStory !== PANEL_PROFILE) {
      router.pushPage('/' + newActiveStory);
    } else {
      router.pushPage(PAGE_PROFILE, { id: `${username}` });
    }
  };

  const isVKCOM = platform !== Platform.VKCOM;

  return (
    <SplitLayout
      modal={<Modal />}
      header={isVKCOM && <PanelHeader separator={false} />}
      style={{ justifyContent: 'center' }}
    >
      {viewWidth.tabletPlus && (
        <SplitCol
          className={viewWidth.tabletPlus.className}
          fixed
          width={280}
          maxWidth={280}
        >
          <Panel>
            {isVKCOM && <PanelHeader />}
            <Group>
              <Cell
                disabled={activeStory === PANEL_FEED}
                style={
                  activeStory === PANEL_FEED
                    ? {
                        backgroundColor:
                          'var(--vkui--color_background_secondary)',
                        borderRadius: 8,
                      }
                    : {}
                }
                data-story={PANEL_FEED}
                onClick={onStoryChange}
                before={<Icon28NewsfeedOutline />}
              >
                feed
              </Cell>
              <Cell
                disabled={activeStory === PANEL_FRIENDS}
                style={
                  activeStory === PANEL_FRIENDS
                    ? {
                        backgroundColor:
                          'var(--vkui--color_background_secondary)',
                        borderRadius: 8,
                      }
                    : {}
                }
                data-story={PANEL_FRIENDS}
                onClick={onStoryChange}
                before={<Icon28UsersOutline />}
              >
                friends
              </Cell>
              <Cell
                disabled={activeStory === PANEL_MESSAGES}
                style={
                  activeStory === PANEL_MESSAGES
                    ? {
                        backgroundColor:
                          'var(--vkui--color_background_secondary)',
                        borderRadius: 8,
                      }
                    : {}
                }
                data-story={PANEL_MESSAGES}
                onClick={onStoryChange}
                before={<Icon28MessageOutline />}
              >
                messages
              </Cell>

              <Cell
                style={
                  activeStory === PANEL_PROFILE
                    ? {
                        backgroundColor:
                          'var(--vkui--color_background_secondary)',
                        borderRadius: 8,
                      }
                    : {}
                }
                data-story={PANEL_PROFILE}
                onClick={onStoryChange}
                before={<Icon28UserCircleOutline />}
              >
                profile
              </Cell>
            </Group>
          </Panel>
        </SplitCol>
      )}

      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activeStory}
          tabbar={
            viewWidth.tabletMinus && (
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === PANEL_FEED}
                  data-story={PANEL_FEED}
                  text="Новости"
                >
                  <Icon28NewsfeedOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === PANEL_FRIENDS}
                  data-story={PANEL_FRIENDS}
                  text="Друзья"
                >
                  <Icon28UsersOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === PANEL_MESSAGES}
                  data-story={PANEL_MESSAGES}
                  // indicator={
                  //   <Counter size="s" mode="prominent">
                  //     12
                  //   </Counter>
                  // }
                  text="Сообщения"
                >
                  <Icon28MessageOutline />
                </TabbarItem>

                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === PANEL_PROFILE}
                  data-story={PANEL_PROFILE}
                  // indicator={<Badge mode="prominent" />}
                  text="Профиль"
                >
                  <Icon28UserCircleOutline />
                </TabbarItem>
              </Tabbar>
            )
          }
        >
          <View id={VIEW_FEED} activePanel={PANEL_FEED}>
            <Feed id={PANEL_FEED}></Feed>
          </View>
          <View id={VIEW_FRIENDS} activePanel={PANEL_FRIENDS}>
            <Friends id={PANEL_FRIENDS}></Friends>
          </View>
          <View id={VIEW_MESSAGES} activePanel={PANEL_MESSAGES}>
            <Messages id={PANEL_MESSAGES}></Messages>
          </View>

          <View id={VIEW_PROFILE} activePanel={PANEL_PROFILE}>
            <Profile id={PANEL_PROFILE}></Profile>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

export default Home;
