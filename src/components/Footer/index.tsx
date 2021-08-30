import {useIntl} from 'umi';
import {HomeOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'ChainButler',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'etos',
          title: <HomeOutlined/>,
          href: 'https://www.etos.cn',
          blankTarget: true,
        },
        /* {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        }, */
      ]}
    />
  );
};
