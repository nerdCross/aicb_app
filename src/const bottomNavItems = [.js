const bottomNavItems = [
    {
      title: 'Home',

      icon: <HomeOutlined style={{ fontSize: '18px' }} />,

      activeIcon: <HomeOutlined style={{ fontSize: '18px', color: '#fff' }} />
    },

    {
      title: 'Search',

      icon: <SearchOutlined style={{ fontSize: '18px' }} />,

      activeIcon: <SearchOutlined style={{ fontSize: '18px', color: '#fff' }} />
    },

    {
      title: 'Notifications',

      icon: <BellOutlined style={{ fontSize: '18px' }} />,

      activeIcon: <BellOutlined style={{ fontSize: '18px', color: '#fff' }} />
    },

    {
      title: 'Menu',

      icon: <MenuOutlined style={{ fontSize: '18px' }} />,

      activeIcon: <MenuOutlined style={{ fontSize: '18px', color: '#fff' }} />,

      onClick: () => <Link to="/about">About</Link>
    }
  ]